import { Col, Layout, Row, Typography } from "antd";
import {
  UserOutlined,
  StarOutlined,
  ForkOutlined,
  EyeOutlined,
  IssuesCloseOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import { gitHubUrl } from "../components/constants/urls";

const { Text } = Typography;
const { Content } = Layout;

function SingleRepoModal({ ...props }) {
  return (
    <>
      <Content>
        <Row gutter={24}>
          {/* author */}
          <Col span={8} offset={4}>
            <Text>
              <UserOutlined /> Author
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>
              <a
                href={`${gitHubUrl}/${props.selectedAuthor}`}
                target="_blank"
                rel="noreferrer"
              >
                {props.selectedAuthor}
              </a>
            </Text>
          </Col>

          {/* open issues */}
          <Col span={8} offset={4}>
            <Text>
              <IssuesCloseOutlined /> Open Issues
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>{props.selectedOpenIssue}</Text>
          </Col>

          {/* Default branch*/}
          <Col span={8} offset={4}>
            <Text>
              <BranchesOutlined /> Default branch
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>{props.selectedDefaultBranch}</Text>
          </Col>

          {/* Star */}
          <Col span={8} offset={4}>
            <Text>
              <StarOutlined /> Star
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>{props.selectedRepoStar}</Text>
          </Col>

          {/* watchers */}
          <Col span={8} offset={4}>
            <Text>
              <EyeOutlined /> Watchers
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>{props.selectedRepoWatchers}</Text>
          </Col>

          {/* forks */}
          <Col span={8} offset={4}>
            <Text>
              <ForkOutlined /> Fork
            </Text>
          </Col>

          <Col span={10} offset={2}>
            <Text>{props.selectedRepoFork}</Text>
          </Col>
        </Row>
      </Content>
      <Content style={{ textAlign: "center", marginTop: "2.5em" }}>
        Last Updated:{" "}
        <Moment format="YYYY/MM/DD">{props.selectedRepoUpdated}</Moment>
      </Content>
    </>
  );
}

export default SingleRepoModal;
