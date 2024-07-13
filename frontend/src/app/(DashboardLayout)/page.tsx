'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
          <iframe
              id={"1"}
              src={`http://127.0.0.1:3003`}
              width={1200}
              height={801}
              allow='fullscreen'
              style={{
                border: "none",
                borderRadius: "0.5rem"
              }}
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
