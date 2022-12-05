// import Layout from "../components/Layout";
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import Feature from '../components/Feature';
// import Service from '../components/Service';
// import About from '../components/About';
// import Footer from '../components/Footer';
// import Alerts from '../components/Alerts';

// const Index = () => {
//   return (
//     <Layout pageTitle="Landing Page Nextjs">
//       <Alerts />
//       <Header />
//       <Hero />
//       <Feature/>
//       <Service />
//       <About />
//       <Footer />
//     </Layout>
//   )
// }

// export default Index;

import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent } from '@mui/material';
import { DashboardLayout } from '../components/NavigationLayout/dashboard-layout'

const Page = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}
            >
              <FeatureBox title="Video Upload" />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={6}
              xs={12}
            >
              <FeatureBox title="Image Upload" />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={6}
              xs={12}
            >
              <FeatureBox title="Story Telling" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


const FeatureBox = (props) => {
  return (
    <>
    <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <h1>
        {props.title}
      </h1>
    </CardContent>
  </Card>
    </>
  );
}
export default Page;
