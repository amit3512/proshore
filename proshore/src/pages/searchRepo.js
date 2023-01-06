import { useEffect, useState } from "react";
import Moment from "react-moment";
import axios from "axios";
import { Button, Card, Input, Layout, Typography } from "antd";
import {
  UserOutlined,
  StarOutlined,
  ForkOutlined,
  GroupOutlined,
  WechatOutlined,
  FieldTimeOutlined,
  UnorderedListOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import * as SORTER from "../utils/sorter";
import { StyledTable, StyledSearchLayout } from "../table/tableStyle";

const { Title, Text } = Typography;
const { Search } = Input;
function App() {
  //states
  const [repositories, setRepository] = useState([]);
  const [selectedSearchedQuery, setSearchedQuery] = useState();
  console.log("repositories", repositories);

  //functions
  async function getAllRepositories() {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${selectedSearchedQuery}&per_page=300`
    );
    setRepository(response?.data?.items);
  }

  //useEffects
  useEffect(() => {
    getAllRepositories();
  }, [selectedSearchedQuery]);

  //additional varaibles data
  const columnsRepo = [
    {
      title: (
        <Text style={{ color: "white" }}>
          <UnorderedListOutlined /> S.N.
        </Text>
      ),

      key: "sn",
      align: "center",
      dataIndex: "sn",
      width: 100,
      sorter: (a, b) => SORTER.sort(a.sn, b.sn),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <GroupOutlined /> Repository Name
        </Text>
      ),
      key: "repo_name",
      align: "center",
      dataIndex: "repo_name",
      sorter: (a, b) => SORTER.sort(a.repo_name, b.repo_name),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <UserOutlined /> Author Name
        </Text>
      ),
      key: "author",
      align: "center",
      dataIndex: "author",
      sorter: (a, b) => SORTER.sort(a.author, b.author),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <StarOutlined /> Number of Stars
        </Text>
      ),
      key: "no_of_stars",
      dataIndex: "no_of_stars",
      align: "center",
      sorter: (a, b) => SORTER.sort(a.no_of_stars, b.no_of_stars),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <EyeOutlined /> Watchers
        </Text>
      ),
      key: "watchers",
      dataIndex: "watchers",
      render: (text) => {
        return text;
      },
      align: "center",
      sorter: (a, b) => SORTER.sort(a.watchers, b.watchers),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <ForkOutlined /> Fork
        </Text>
      ),
      key: "fork",
      dataIndex: "fork",
      render: (text) => {
        return text;
      },
      align: "center",
      sorter: (a, b) => SORTER.sort(a.fork, b.fork),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <WechatOutlined /> Short Description
        </Text>
      ),
      key: "description",
      align: "center",
      dataIndex: "description",
      ellipsis: true,
      sorter: (a, b) => SORTER.sort(a.description, b.description),
    },

    {
      title: (
        <Text style={{ color: "white" }}>
          <FieldTimeOutlined /> Last Updated
        </Text>
      ),

      key: "date_last_updated",
      dataIndex: "date_last_updated",
      align: "center",
      sorter: (a, b) => SORTER.sort(a.date_last_updated, b.date_last_updated),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      dataIndex: "action",
    },
  ];

  const sampleTableData =
    repositories &&
    repositories?.map((repo, index) => {
      return {
        sn: index + 1,
        repo_name: repo?.full_name,
        author: repo?.full_name.split("/")?.[0],
        no_of_stars: repo?.stargazers_count,
        watchers: repo?.watchers_count,
        fork: repo?.forks_count,
        description: repo?.description,
        date_last_updated: (
          <Moment format="YYYY/MM/DD">{repo?.updated_at}</Moment>
        ),
        action: (
          <Button style={{ background: "#ffa500", color: "#fff" }}>
            {" "}
            <a
              href={`/repo/${repo?.id}`}
              style={{ color: "#fff" }}
              target="_blank"
              rel="noreferrer"
            >
              View Details
            </a>
          </Button>
        ),
      };
    });

  const onSearch = (value) => setSearchedQuery(value);

  return (
    <>
      <StyledSearchLayout
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: " 0.9em 0 0.9em 0",
        }}
      >
        <Card
          title={
            <Title level={4} style={{ color: "#fff" }}>
              Search GitHub Repository
            </Title>
          }
          style={{ backgroundColor: "#2196f3" }}
        >
          <Search
            allowClear
            placeholder="Input Repository Name"
            onSearch={onSearch}
            style={{
              width: 500,
            }}
          />
        </Card>
      </StyledSearchLayout>
      {selectedSearchedQuery && (
        <Layout.Content>
          <Card>
            <StyledTable
              columns={columnsRepo}
              dataSource={sampleTableData}
              pagination={true}
              scroll={{ x: 400 }}
            />
          </Card>
        </Layout.Content>
      )}
    </>
  );
}

export default App;
