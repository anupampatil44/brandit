import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import RightSection from "../components/RightSection";
import LeftSection from "../components/LeftSection";
import CountactUs from "../components/ContactUs";
import Procedure from "../components/Procedure";
import Navbar from "../components/Navbar";
export default function HomePage({loading, setLoading}) {
  useEffect(() => {
    setLoading(false);
  },[]);
  return (
    <React.Fragment>
      <Navbar />
      <Grid container spacing={3} style={{ padding: 30 }} alignItems="center">
        <Grid item md={6}>
          <LeftSection />
        </Grid>
        <Grid item md={6} justifyContent="center">
          <RightSection />
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item md={8}>
            <Procedure/>
            <CountactUs />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
