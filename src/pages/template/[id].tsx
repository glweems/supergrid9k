import React from "react";

export default function Template() {
  return <div>template page</div>;
}
export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
