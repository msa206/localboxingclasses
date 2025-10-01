-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS lbc.lbc_gyms_near_zip CASCADE;

-- Create the RPC function in the lbc schema
CREATE OR REPLACE FUNCTION lbc.lbc_gyms_near_zip(
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
  postal_code text,
  review_count bigint,
  review_stars double precision,
  working_hours text,
  latitude double precision,
  longitude double precision,
  source_url text,
  distance_mi numeric,
  offers_kids boolean,
  offers_kickboxing boolean,
  offers_free_trial boolean,
  beginner_friendly boolean,
  women_focused boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  zip_lat double precision;
  zip_lon double precision;
BEGIN
  -- Get the coordinates from the ZIP code table
  SELECT z.latitude, z.longitude
  INTO zip_lat, zip_lon
  FROM public.zipcodes z
  WHERE z.zip = p_zip;

  -- If ZIP not found, return empty
  IF zip_lat IS NULL OR zip_lon IS NULL THEN
    RETURN;
  END IF;

  -- Return gyms within radius, sorted by distance
  RETURN QUERY
  SELECT
    g.id::bigint,
    g.name::text,
    g.site::text,
    g.phone_number::text,
    g.full_address::text,
    g.street::text,
    g.city::text,
    g.state::text,
    g.postal_code::text,
    g.review_count::bigint,
    g.review_stars::double precision,
    g.working_hours::text,
    g.latitude::double precision,
    g.longitude::double precision,
    g.source_url::text,
    ROUND(
      3959 * acos(
        cos(radians(zip_lat)) * cos(radians(g.latitude)) *
        cos(radians(g.longitude) - radians(zip_lon)) +
        sin(radians(zip_lat)) * sin(radians(g.latitude))
      )::numeric, 1
    ) as distance_mi,
    g.offers_kids::boolean,
    g.offers_kickboxing::boolean,
    g.offers_free_trial::boolean,
    g.beginner_friendly::boolean,
    g.women_focused::boolean
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
GRANT EXECUTE ON FUNCTION lbc.lbc_gyms_near_zip TO anon, authenticated;
