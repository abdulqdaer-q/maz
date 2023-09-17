"use client";
import SearchJobBar from "@/components/SearchJobBar";
import { useAuthContext } from "@/contexts/AuthContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { Degree } from "@/types/Education";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Popconfirm,
  Row,
} from "antd";
import Title from "antd/es/typography/Title";
import { format, formatDuration, intervalToDuration } from "date-fns";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Container = ({ children }: PropsWithChildren) => (
  <div className="w-1/2 pt-5 mx-auto">{children}</div>
);

type Props = {
  user: User;
  showEdit: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};
const Profile = ({ user, showEdit = false, setReload }: Props) => {
  const [percentage, setPercentage] = useState(20);
  const getLatestEducation = () => {
    const degrees: { [key: string]: number } = Object.values(Degree).reduce(
      (bef, e, idx) => ({
        [e]: idx,
        ...bef,
      }),
      {}
    );
    if (!user?.userInfo?.educations || user.userInfo.educations.length === 0) {
      return undefined;
    }
    const currentEducation = user.userInfo.educations.sort(
      (a, b) => degrees[b.degree] - degrees[a.degree]
    )[0];
    return `${currentEducation.degree}, ${currentEducation.feildOfStudy}`;
  };
  const getYearsOfExperience = () => {
    if (
      !user?.userInfo?.experiences ||
      user.userInfo.experiences.length === 0
    ) {
      return undefined;
    }
    let diff = 0;
    for (const experience of user.userInfo.experiences) {
      diff += differenceInMilliseconds(
        new Date(experience?.endDate || Date.now()),
        new Date(experience.startDate)
      );
    }
    return formatDuration(
      intervalToDuration({
        start: new Date(0),
        end: new Date(diff),
      }),
      {
        format: ["years", "months"],
        delimiter: ",",
      }
    );
  };
  const latestEducation =
    useMemo(() => getLatestEducation(), [user]) ||
    (showEdit ? undefined : "No Education");
  const yearsOfExperience =
    useMemo(() => getYearsOfExperience(), [user]) ||
    (showEdit ? undefined : "No Experience");

  return (
    <>
      <Container>
        <SearchJobBar />
      </Container>
      <div className="bg-gray-200 w-full">
        <Container>
          <Row gutter={10}>
            <Col span={8}>
              <Card>
                <Title className="!font-thin !text-gray-400" level={3}>
                  {showEdit ? "Your Profile Score" : "Profile Score"}
                </Title>
                <div className="flex justify-center mt-10">
                  <CircularProgressbar
                    className="!w-1/2"
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
                {showEdit && (
                  <p className="mt-5 font-thin">
                    Reach profile strength of 80% to be assigned to more jobs.
                  </p>
                )}
              </Card>
              <Card className="my-5">
                <Title level={3}>Contact Information</Title>
                <Row className="items-center mt-5">
                  {[
                    {
                      label: "Email",
                      value: user.email,
                    },
                    {
                      label: "Mobile",
                      value: user.userInfo?.mobilePhone,
                    },
                  ].map((e) => (
                    <KeyValueColumn {...e} key={e.label} />
                  ))}
                </Row>
              </Card>
              {showEdit && (
                <Card className="mt-5">
                  <Title className="!font-thin !text-gray-400" level={4}>
                    Check who saw your profile
                  </Title>
                </Card>
              )}
            </Col>
            <Col span={16}>
              <MainInfoCard
                className="mb-5"
                user={user}
                latestEducation={latestEducation}
                yearsOfExperience={yearsOfExperience}
              />
              <Card className="mb-5">
                <div className="flex justify-between">
                  <Title level={2}>Personal Information</Title>
                  {showEdit && (
                    <div>
                      <Link href="/profile/personal-information/edit">
                        <Button icon={<EditOutlined />} type="link" />
                      </Link>
                    </div>
                  )}
                </div>
                <Row gutter={5} className="items-center mt-5">
                  {[
                    {
                      label: "Name",
                      value:
                        user.userInfo?.firstName +
                        " " +
                        user.userInfo?.lastName,
                    },
                    {
                      label: "Birth date",
                      value: `${format(
                        new Date(user.userInfo!.birthday),
                        "dd MMMM yyyy"
                      )} (Age: ${
                        formatDuration(
                          intervalToDuration({
                            start: new Date(user.userInfo!.birthday),
                            end: Date.now(),
                          }),
                          {
                            format: ["years"],
                          }
                        ).split(" ")[0]
                      })`,
                    },
                    {
                      label: "Gender",
                      value: user.userInfo?.gender,
                    },
                    {
                      label: "Nationality",
                      value: user.userInfo?.nationality.name,
                    },
                    {
                      label: "Residence country",
                      value: user.userInfo?.residenceCountry.name,
                    },
                  ].map((e) => (
                    <KeyValueColumn {...e} key={e.label} />
                  ))}
                </Row>
              </Card>

              {!!user.userInfo?.experiences?.length && (
                <Card>
                  <div className="flex justify-between">
                    <Title level={2}>Experience</Title>
                    {showEdit && (
                      <div>
                        <Link href="/profile/experiences/add">
                          <Button icon={<PlusOutlined />} type="link" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <Row gutter={5} className="items-center mt-5">
                    {user.userInfo?.experiences
                      .sort(
                        (a, b) =>
                          new Date(b.startDate).valueOf() -
                          new Date(a.startDate).valueOf()
                      )
                      .map((e) => (
                        <Fragment key={e.id}>
                          <div className="flex justify-between w-full">
                            <Title level={3}>{e.jobTitle}</Title>
                            {showEdit && (
                              <div>
                                <Link
                                  href={`/profile/experiences/${e.id}/edit`}
                                >
                                  <Button icon={<EditOutlined />} type="link" />
                                </Link>
                                <Popconfirm
                                  title="Delete the Experience"
                                  description="Are you sure to delete this Experience?"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={async () => {
                                    await axios.delete("/experiences/" + e.id);
                                    message.success("deleted successfully");
                                    setReload((p) => !p);
                                  }}
                                >
                                  <Button
                                    danger
                                    icon={<DeleteFilled />}
                                    type="link"
                                  />
                                </Popconfirm>
                              </div>
                            )}
                          </div>
                          {[
                            { label: "Company", value: e.companyName },
                            {
                              label: "",
                              value: `${format(
                                new Date(e.startDate),
                                "MMMM yyyy"
                              )} - ${
                                e.endDate
                                  ? format(new Date(e.endDate), "MMMM yyyy")
                                  : "Now"
                              } (${formatDuration(
                                intervalToDuration({
                                  start: new Date(e.startDate),
                                  end: new Date(e.endDate || Date.now()),
                                }),
                                {
                                  format: ["years", "months"],
                                  delimiter: ",",
                                }
                              )})`,
                            },
                            {
                              label: "Industry",
                              value: e.companyIndustry?.title,
                            },
                            { label: "Location", value: e.jobLocation?.name },
                          ].map((x) => (
                            <KeyValueColumn {...x} key={e.id + "-" + x.label} />
                          ))}
                          <Divider />
                        </Fragment>
                      ))}
                  </Row>
                </Card>
              )}
              {!!user.userInfo?.educations?.length && (
                <Card className="mt-5">
                  <div className="flex justify-between">
                    <Title level={2}>Education</Title>
                    {showEdit && (
                      <div>
                        <Link href="/profile/educations/add">
                          <Button icon={<PlusOutlined />} type="link" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <Row gutter={5} className="items-center mt-5">
                    {user.userInfo?.educations
                      .sort(
                        (a, b) =>
                          new Date(b.graduationDate).valueOf() -
                          new Date(a.graduationDate).valueOf()
                      )
                      .map((e) => (
                        <Fragment key={e.id}>
                          <div className="flex justify-between w-full">
                            <Title level={3}>{e.university}</Title>

                            {showEdit && (
                              <div>
                                <Link href={`/profile/educations/${e.id}/edit`}>
                                  <Button icon={<EditOutlined />} type="link" />
                                </Link>
                                <Popconfirm
                                  title="Delete the Education"
                                  description="Are you sure to delete this Education?"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={async () => {
                                    await axios.delete("/educations/" + e.id);
                                    message.success("deleted successfully");
                                    setReload((p) => !p);
                                  }}
                                >
                                  <Button
                                    danger
                                    icon={<DeleteFilled />}
                                    type="link"
                                  />
                                </Popconfirm>
                              </div>
                            )}
                          </div>
                          {[
                            {
                              label: "Location",
                              value: e.country?.name,
                            },
                            { label: "Degree", value: e.degree },
                            {
                              label: "Feild",
                              value: e.feildOfStudy,
                            },
                          ].map((x) => (
                            <KeyValueColumn {...x} key={e.id + "-" + x.label} />
                          ))}
                          <Divider />
                        </Fragment>
                      ))}
                  </Row>
                </Card>
              )}
              <div className="mb-5"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

type MainCardProps = {
  user: User;
  latestEducation?: string;
  yearsOfExperience?: string;
  className?: string;
};
const MainInfoCard = ({
  user,
  yearsOfExperience,
  latestEducation,
  className,
}: MainCardProps) => (
  <Card className={className}>
    <Row gutter={20}>
      <Col span={6}>
        <Image
          src={getPhotoLink(user.userInfo!.photo.url)}
          className="!w-28 !h-28 rounded-full"
          alt="avatar"
        />
      </Col>
      <Col span={18}>
        <Title level={3}>
          {user.userInfo?.firstName} {user.userInfo?.lastName}
        </Title>
        <Row gutter={5} className="items-center">
          {[
            {
              label: "Location",
              value: user?.userInfo?.residenceCountry.name,
            },
            {
              label: "Education",
              value: latestEducation || (
                <Link href="/profile/educations/add">
                  Add your first Eduction
                </Link>
              ),
            },
            {
              label: "Experience",
              value: yearsOfExperience || (
                <Link href="/profile/experiences/add">
                  Add your first Experience
                </Link>
              ),
            },
          ].map((e) => (
            <KeyValueColumn {...e} key={"personal-" + e.label} />
          ))}
        </Row>
      </Col>
    </Row>
  </Card>
);

export const KeyValueColumn = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => (
  <Fragment>
    <Col span={8} className="mt-1">
      <p className="font-bold">{label}</p>
    </Col>
    <Col span={16}>
      <p className="text-gray-500">{value}</p>
    </Col>
  </Fragment>
);

export default Profile;
