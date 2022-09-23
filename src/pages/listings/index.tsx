import Layout from "../../components/Layout";
import ListingCard from "../../components/ListingCard";
import { Listing } from "@prisma/client";
import { client } from "@/utils/trpc";

type Props = {
  listings: Listing[];
};

const IndexPage: React.FC<Props> = ({ listings }) => {
  return (
    <Layout title="Listings">
      <div
        className="
          flex
          flex-col
          justify-start
          items-center
          flex-grow
          mt-4
          mb-4
        "
      >
        <h2 className="text-4xl font-semibold">Listings</h2>
        <div className="gap-4 mt-4 grid sm:grid-cols-2">
          {listings?.reverse().map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const listings = await client.query("get-all-listings");

  return {
    props: {
      listings,
    },
  };
}
