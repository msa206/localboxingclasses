-- RPC function to find boxing gyms near a ZIP code
-- Uses the shared public._zip_import table for ZIP code coordinates
-- Queries lbc.boxing_gyms directly
CREATE OR REPLACE FUNCTION public.lbc_gyms_near_zip(
  p_zip text,
  p_radius_mi integer DEFAULT 25,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS TABLE (
  id bigint,
  name text,
  site text,
  phone_number text,
  full_address text,
  street text,
  city text,
  state text,
  postal_code bigint,
  review_count bigint,
  review_stars double precision,
  working_hours jsonb,
  latitude double precision,
  longitude double precision,
  source_url text,
  distance_mi numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  zip_lat double precision;
  zip_lon double precision;
BEGIN
  -- Get the coordinates from the shared ZIP code table
  SELECT z.lat, z.lng
  INTO zip_lat, zip_lon
  FROM public._zip_import z
  WHERE z.zip = p_zip;

  -- If ZIP not found, return empty
  IF zip_lat IS NULL OR zip_lon IS NULL THEN
    RETURN;
  END IF;

  -- Return gyms within radius, sorted by distance
  RETURN QUERY
  SELECT
    g.id,
    g.name,
    g.site,
    g.phone_number,
    g.full_address,
    g.street,
    g.city,
    g.state,
    g.postal_code,
    g.review_count,
    g.review_stars,
    g.working_hours,
    g.latitude,
    g.longitude,
    g.source_url,
    ROUND(
      3959 * acos(
        cos(radians(zip_lat)) * cos(radians(g.latitude)) *
        cos(radians(g.longitude) - radians(zip_lon)) +
        sin(radians(zip_lat)) * sin(radians(g.latitude))
      )::numeric, 1
    ) as distance_mi
  FROM lbc.boxing_gyms g
  WHERE
    g.latitude IS NOT NULL
    AND g.longitude IS NOT NULL
    AND (
      3959 * acos(
        cos(radians(zip_lat)) * cos(radians(g.latitude)) *
        cos(radians(g.longitude) - radians(zip_lon)) +
        sin(radians(zip_lat)) * sin(radians(g.latitude))
      )
    ) <= p_radius_mi
  ORDER BY distance_mi ASC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- Grant execute permission to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.lbc_gyms_near_zip TO anon, authenticated;

-- Note: The public._zip_import table can be shared across multiple projects
-- (localboxingclasses, localpotteryclasses, etc.) since ZIP codes are universal