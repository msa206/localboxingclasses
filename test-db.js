const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://qldrzejvmawlpgwcaxps.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZHJ6ZWp2bWF3bHBnd2NheHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MzM1MTcsImV4cCI6MjA3MjIwOTUxN30.VZrSliGVZ_nShfICsIzPcQqfyRTKMWwuUrSGJyw0PJ0'
)

async function testQuery() {
  // Get sample data to see the state format
  const { data, error } = await supabase
    .from('lbc_boxing_gyms')
    .select('state, city, name')
    .limit(10)

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Sample data from lbc_boxing_gyms:')
    console.log(JSON.stringify(data, null, 2))

    // Check unique states
    const { data: stateData } = await supabase
      .from('lbc_boxing_gyms')
      .select('state')
      .limit(100)

    const uniqueStates = [...new Set(stateData?.map(item => item.state))].filter(Boolean)
    console.log('\nUnique state values found:', uniqueStates.slice(0, 10))
  }
}

testQuery()