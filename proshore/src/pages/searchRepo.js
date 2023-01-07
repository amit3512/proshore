import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import {
  UserOutlined,
  StarOutlined,
  ForkOutlined,
  GroupOutlined,
  WechatOutlined,
  FieldTimeOutlined,
  UnorderedListOutlined,
  EyeOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

import * as SORTER from "../utils/sorter";
import { StyledTable, StyledSearchLayout } from "../style/tableStyle";
import SingleRepoModal from "../components/singleRepoModal";
import { getAllRepositoriesFromStore } from "../store/action/repo";

const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const repos = useSelector((state) => state.repo?.data);
  const dispatch = useDispatch();

  //states
  // const [repositories, setRepository] = useState([]);
  const [selectedSearchedQuery, setSearchedQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState();
  const [selectedRepoName, setSelectedRepoName] = useState();
  const [selectedAuthor, setSelectedRepoAuthor] = useState();
  const [selectedRepoStar, setSelectedRepoStar] = useState();
  const [selectedRepoWatchers, setSelectedRepoWatchers] = useState();
  const [selectedRepoFork, setSelectedRepoFork] = useState();
  const [selectedRepoDescription, setSelectedRepoDescription] = useState();
  const [selectedRepoUpdated, setSelectedRepoUpdated] = useState();
  const [selectedOpenIssue, setSelectedRepoOpenIssue] = useState();
  const [selectedDefaultBranch, setSelectedRepoDefaultBranch] = useState();

  //functions
  // async function getAllRepositories() {
  //   setLoading(true);
  //   const response = await axios.get(
  //     `${baseUrl}?q=${selectedSearchedQuery}&per_page=3000`
  //   );
  //   setRepository(response?.data?.items);
  //   setLoading(false);
  // }

  //useEffects
  useEffect(() => {
    // setRepository();
    // getAllRepositories();
    setLoading(true);
    dispatch(getAllRepositoriesFromStore(selectedSearchedQuery, setLoading));
  }, [selectedSearchedQuery]);

  //function variables
  const showModal = (
    repo_id,
    repo_title,
    repo_author,
    repo_star,
    repo_watchers,
    repo_fork,
    repo_description,
    repo_updated,
    repo_open_issue,
    repo_default_branch
  ) => {
    setIsModalOpen(true);
    setSelectedRepo(repo_id);
    setSelectedRepoName(repo_title);
    setSelectedRepoAuthor(repo_author);
    setSelectedRepoStar(repo_star);
    setSelectedRepoWatchers(repo_watchers);
    setSelectedRepoFork(repo_fork);
    setSelectedRepoDescription(repo_description);
    setSelectedRepoUpdated(repo_updated);
    setSelectedRepoOpenIssue(repo_open_issue);
    setSelectedRepoDefaultBranch(repo_default_branch);
  };

  const onSearch = (value) => setSearchedQuery(value);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRepo();
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   setSelectedRepo();
  // };

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
          <StarOutlined /> Star
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
      title: (
        <Text style={{ color: "white" }}>
          <ArrowDownOutlined /> Action
        </Text>
      ),
      key: "action",
      align: "center",
      dataIndex: "action",
    },
  ];

  const sampleTableData =
    // repositories &&
    // repositories?.map((repo, index) => {
    repos &&
    repos?.map((repo, index) => {
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
          <Button
            style={{ background: "#ffa500", color: "#fff" }}
            onClick={() =>
              showModal(
                repo?.id,
                repo?.full_name,
                repo?.full_name.split("/")?.[0],
                repo?.stargazers_count,
                repo?.watchers_count,
                repo?.forks_count,
                repo?.description,
                repo?.updated_at,
                repo?.open_issues_count,
                repo?.default_branch
              )
            }
          >
            {" "}
            {/* <a
              href={`/repo/${repo?.id}`}
              style={{ color: "#fff" }}
              target="_blank"
              rel="noreferrer"
            > */}
            View Details
            {/* </a> */}
          </Button>
        ),
      };
    });

  return (
    <>
      <StyledSearchLayout>
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
              loading={loading}
            />
          </Card>
        </Layout.Content>
      )}

      {/* //Repo Description */}
      {selectedRepo && (
        <Modal
          title={
            <>
              <Title level={4}>
                <a
                  href={`https://github.com/${selectedRepoName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedRepoName}
                </a>

                {selectedRepoDescription ? (
                  <>
                    <br />
                    <span style={{ fontSize: "14px", fontWeight: "normal" }}>
                      <WechatOutlined /> {selectedRepoDescription}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </Title>

              <Divider />

              <SingleRepoModal
                selectedRepoName={selectedRepoName}
                selectedAuthor={selectedAuthor}
                selectedRepoStar={selectedRepoStar}
                selectedOpenIssue={selectedOpenIssue}
                selectedRepoWatchers={selectedRepoWatchers}
                selectedRepoFork={selectedRepoFork}
                selectedDefaultBranch={selectedDefaultBranch}
                selectedRepoUpdated={selectedRepoUpdated}
              />
            </>
          }
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        ></Modal>
      )}
    </>
  );
}

export default App;
