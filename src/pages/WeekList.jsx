import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../components/api/axios";
import loader from "../assets/loader.svg";
import Button from "../components/Button";
import { useState } from "react";

const fetchList = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const list = await axios.get("/course/meaning", {
    withCredentials: true,
  });
  return list.data;
};

export default function WeekList() {
  const [word, setWord] = useState("");

  const fetchExtra = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const list = await axios.get(`/course/definition?vocabulary=${word}`, {
      withCredentials: true,
    });
    return list.data;
  };

  const fetchAdditionalDef = (word) => {
    setWord(word);
    additionalList.refetch();
  };

  const vocabList = useQuery({
    queryFn: fetchList,
    queryKey: ["vocab"],
  });

  const additionalList = useQuery({
    queryFn: () => fetchExtra(word),
    queryKey: ["extra", word],
    enabled: !!word,
  });

  // const { additionalList, refetch } = useQuery(["extra", word], fetchExtra, {
  //   enabled: false,
  // });

  console.log("loading data");
  console.log(vocabList.data);

  if (vocabList.isLoading) return <div>Loading Vocabulary List...</div>;

  if (vocabList.isError) return <div>Error Loading Vocabulary List...</div>;

  if (!vocabList.data) {
    return <div>data is undefined</div>;
  }

  return (
    <>
      {vocabList.data?.length > 0 && (
        <table>
          <td></td>
        </table>
      )}

      {vocabList.data?.length > 0 && (
        <table>
          <tr key={"header"}>
            {Object.keys(vocabList.data[0])
              .filter((key) => key != "id")
              .map((key) => (
                <th>{key}</th>
              ))}
          </tr>
          {vocabList.data?.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>{item.word}</td>
              <td>{item.definition}</td>

              <td>
                <Button
                  id={item.id}
                  text="Fetch Definition"
                  css="check--button"
                  loading={false}
                  disabled={false}
                  onClick={() => fetchAdditionalDef(item.word)}
                />
              </td>
            </tr>
          ))}
        </table>
      )}

      {additionalList.isLoading && <p>Updating definition</p>}

      {additionalList.data?.length > 0 && (
        <div>
          <p>Additional definitions just for you </p>
          <p>{additionalList.data}</p>
        </div>
      )}
    </>
  );
}
