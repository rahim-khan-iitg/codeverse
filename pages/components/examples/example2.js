import { query } from "@/config/db"; // Adjust the path as needed

async function getDataFromDatabase() {
  try {
    const sql = 'SELECT * FROM `sailors`';
    const data = await query(sql);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return [];
  }
}

export default function MyPage({ data }) {
  // Use the data retrieved from the database in your component
  // data contains the results of your SQL query
  console.log(data)
  return (
    <div>
      {/* Render your data here */}
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getDataFromDatabase();

  return {
    props: {
      data,
    },
  };
}
