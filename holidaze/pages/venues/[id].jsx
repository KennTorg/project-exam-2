import React from "react";
import { useRouter } from "next/router";
import VenueDetails from "@/components/VenueDetails";
import Layout from "@/components/Layout";

const VenueDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("Router ID:", id);

  return (
    <Layout>
      <div>
        <VenueDetails venueId={id} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: {
      venueId: id,
    },
  };
}

export default VenueDetailsPage;
