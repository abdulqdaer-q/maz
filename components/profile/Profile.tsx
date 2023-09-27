"use client";
import SearchJobBar from "@/components/SearchJobBar";
import { useAuthContext } from "@/contexts/AuthContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { Degree } from "@/types/Education";
import { LanguageLevel, Speciality } from "@/types/Specaility";
import { User } from "@/types/User";
import { Views } from "@/types/View";
import { axios } from "@/utils/axios";
import { DeleteFilled, EditOutlined, MessageFilled, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Popconfirm,
  Row,
  Tag,
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
import Container from "../layout/container";
import SkillsFormModal from "../modals/SkillsFormModal";
import SpecialityFormModal from "../modals/SpecialityFormModal";

const getPercentage = (user: User) => {

  return (((user.userInfo?.educations?.length || 0) > 0 ? 1 : 0) * 10
    + ((user.userInfo?.experiences?.length || 0) > 0 ? 1 : 0) * 10 +
    (Math.min(1, (user.userInfo?.specialities?.length || 0) / 3) * 20.0) +
    (Math.min(1, (user.userInfo?.languages?.length || 0) / 2) * 20) + (Math.min(1, (user.userInfo?.skills?.length || 0) / 4) * 20) + 20).toFixed(2);

}

type Props = {
  user: User;
  showEdit: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};
const Profile = ({ user, showEdit = false, setReload }: Props) => {
  const percentage = getPercentage(user);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [views, setViews] = useState<Views>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality | LanguageLevel>();
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
  useEffect(() => {
    if (showEdit) {
      const fetchViews = async () => {
        const { data } = await axios.get<Views>(
          `/views?filters[visitedUser][id][$eq]=${user!.userInfo!.id
          }&populate[userInfo][fields][0]=id&populate[userInfo][populate][user][fields][0]=id&populate[userInfo][fields][1]=firstName&populate[userInfo][fields][2]=lastName&populate[userInfo][populate][photo][fields][0]=url&populate[visitedUser][fields][0]=id&pagination[limit]=5`
        );
        setViews(data);
      };
      fetchViews();
    }
  }, []);
  return (
    <>
      <SpecialityFormModal
        open={open || langOpen}
        initialValues={selectedSpeciality}
        isLanguage={langOpen}
        id={selectedSpeciality?.id}
        onSuccess={() => {
          setReload((p) => !p);
          setOpen(false);
          setLangOpen(false);
          setSelectedSpeciality(undefined);
        }}
        key={selectedSpeciality?.id}
        onCancel={() => {
          setOpen(false);
          setLangOpen(false);
          setSelectedSpeciality(undefined);
        }}
      />
      <SkillsFormModal default={user.userInfo?.skills?.map(e => e.id)} setReload={setReload} setOpen={setSkillsOpen} open={skillsOpen} />

      <div className="bg-gray-200 w-full py-10">
        <Container>

          <Row gutter={10}>
            <Col span={8}>
              {showEdit && <Card>

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
              </Card>}

              {showEdit && (
                <Card className="mt-5">
                  <Title className="!font-bold !text-gray-700" level={4}>
                    Check who saw your profile
                  </Title>
                  <p className="mb-10 text-xs text-gray-400">
                    Here You can see lastest 5 people who saw Your profile
                  </p>
                  {views.map((view) => (
                    <Row key={view.id} gutter={10} className="mb-3">
                      <Col span={6}>
                        <Image
                          src={getPhotoLink(view.userInfo!.photo?.url)}
                          className="!w-14 !h-14 rounded-full"
                          alt="avatar"
                        />
                      </Col>
                      <Col span={18}>
                        <Link
                          key={view.id}
                          href={`/profile/${view.userInfo.user!.id}`}
                        >
                          <>
                            <Title level={5}>
                              {view.userInfo.firstName +
                                " " +
                                view.userInfo.lastName}
                            </Title>
                            <p className="text-xs text-gray-500">
                              Viewed :{" "}
                              {
                                formatDuration(
                                  intervalToDuration({
                                    start: new Date(view.updatedAt),
                                    end: Date.now(),
                                  }),
                                  {
                                    format: [
                                      "days",
                                      "hours",
                                      "minutes",
                                      "seconds",
                                    ],
                                    delimiter: ",",
                                  }
                                )
                                  .replaceAll(" ", "")
                                  .replaceAll("days", "d")
                                  .replaceAll("day", "d")
                                  .replaceAll("hours", "h")
                                  .replaceAll("hour", "h")
                                  .replaceAll("seconds", "s")
                                  .replaceAll("minutes", "m")
                                  .replaceAll("minute", "m")
                                  .split(",")[0]
                              }
                              {" ago"}
                            </p>
                          </>
                        </Link>
                      </Col>
                    </Row>
                  ))}
                </Card>
              )}
              {(showEdit || !!user.userInfo?.specialities?.length) &&
                <Card className="mt-5">
                  <div className="flex justify-between">
                    <Title level={2}>Specialities</Title>
                    {showEdit && <div>
                      <Button
                        icon={<PlusOutlined />}
                        type="link"
                        onClick={() => {
                          setOpen(true);
                        }}
                      />
                    </div>}
                  </div>
                  <Row>
                    {user.userInfo?.specialities?.map((e) => (
                      !showEdit ? <KeyValueColumn label={e.name} value={e.level} /> :
                        <div className={`flex justify-between `} key={e.id}>
                          <KeyValueColumn label={e.name} value={e.level} />
                          {showEdit && <div className="flex">
                            <Button type="link" onClick={() => {
                              setSelectedSpeciality(e);
                              setOpen(true);
                            }} icon={<EditOutlined />} />

                            <Popconfirm
                              title="Delete the Speciality"
                              description="Are you sure to delete this Speciality?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={async () => {
                                await axios.delete("/specialities/" + e.id);
                                message.success("deleted successfully");
                                setReload((p) => !p);
                              }}
                            >
                              <Button type="link" danger icon={<DeleteFilled />} />
                            </Popconfirm>

                          </div>}
                        </div>
                    ))}
                  </Row>
                </Card>}
              {(showEdit || !!user.userInfo?.skills?.length) && <Card className="mt-5">
                <div className="flex justify-between">
                  <Title level={2}>Skills</Title>
                  {showEdit && <div>
                    <Button
                      icon={<PlusOutlined />}
                      type="link"
                      onClick={() => {
                        setSkillsOpen(true);
                      }}
                    />
                  </div>}
                </div>
                <Row>
                  {user.userInfo?.skills?.map((e) => (
                    <Tag closable={showEdit} onClose={async () => {
                      await axios.put('/user-infos/' + user!.userInfo!.id, {
                        data: {
                          skills: user.userInfo?.skills?.filter(x => x.id !== e.id)
                        }
                      })
                      setReload(e => !e);
                    }} key={e.id}>
                      {e.name}
                    </Tag>


                  ))}
                </Row>
              </Card>}
              {(showEdit || !!user.userInfo?.languages?.length) && <Card className="mt-5  mb-10">
                <div className="flex justify-between">
                  <Title level={2}>Languages</Title>
                  {showEdit && <div>
                    <Button
                      icon={<PlusOutlined />}
                      type="link"
                      onClick={() => {
                        setLangOpen(true);
                      }}
                    />
                  </div>}
                </div>
                <Row>
                  {user.userInfo?.languages?.map((e) => (
                    !showEdit ? <KeyValueColumn label={e.language} value={e.level} /> :
                      <div className="flex justify-between " key={e.id}>
                        <KeyValueColumn label={e.language} value={e.level} />
                        {showEdit && <div className="flex">
                          <Button type="link" onClick={() => {
                            setSelectedSpeciality(e);
                            setLangOpen(true);
                          }} icon={<EditOutlined />} />

                          <Popconfirm
                            title="Delete the language"
                            description="Are you sure to delete this language?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={async () => {
                              await axios.delete("/language-levels/" + e.id);
                              message.success("deleted successfully");
                              setReload((p) => !p);
                            }}
                          >
                            <Button type="link" danger icon={<DeleteFilled />} />
                          </Popconfirm>

                        </div>
                        }
                      </div>
                  ))}
                </Row>
              </Card>}
            </Col>
            <Col span={16}>

              <MainInfoCard
                className="mb-5"
                user={user}
                showEdit={showEdit}
                latestEducation={latestEducation}
                yearsOfExperience={yearsOfExperience}
              />
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
              <Card>
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
                      )} (Age: ${formatDuration(
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
                      value: user.userInfo?.nationality?.name,
                    },
                    {
                      label: "Residence country",
                      value: user.userInfo?.residenceCountry?.name,
                    },
                  ].map((e) => (
                    <KeyValueColumn {...e} key={e.label} />
                  ))}
                </Row>
              </Card>

              {!!user.userInfo?.experiences?.length && (
                <Card className="mt-5">
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
                              )} - ${e.endDate
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
  showEdit: boolean;
};
const MainInfoCard = ({
  user,
  yearsOfExperience,
  latestEducation,
  className,
  showEdit
}: MainCardProps) => {
  const { user: loggedInUser } = useAuthContext();
  const router = useRouter();
  return (<Card className={className}>
    <Row gutter={20}>
      <Col span={6}>
        <Avatar
          src={getPhotoLink(user?.userInfo?.photo?.url || '')}
          icon={<UserOutlined />}
          size={80}
          alt="avatar"
        />
      </Col>
      <Col span={18}>

        <Title level={3}>
          {user.userInfo?.firstName} {user.userInfo?.lastName} {!showEdit && <Button onClick={async () => {
            if (!loggedInUser?.id) {
              message.error("please login");
              return;
            }
            const user1 = Math.min(loggedInUser.id, user.id);
            const user2 = Math.max(loggedInUser.id, user.id);
            const { data: fetchedData } = await axios.get(`/chats?populate=user1,user2&filters[user1][id][$eq]=${user1}&filters[user2][id][$eq]=${user2}`)
            if (fetchedData.length) {
              router.replace('/chat?#@' + fetchedData[0].id)
              return;
            }
            const { data } = await axios.post("/chats", {
              data: {
                user1,
                user2,
              },
            });
            router.push('/chat?#@' + data.id)
          }} type="link" size="large" icon={<MessageFilled />}>  </Button>}
        </Title>
        <Row gutter={5} className="items-center">
          {[
            {
              label: "Location",
              value: user?.userInfo?.residenceCountry?.name,
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
  </Card>)
};

export const KeyValueColumn = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => (
  <>
    <Col span={8} className="mt-1">
      <p className="font-bold">{label}</p>
    </Col>
    <Col span={16} className="mt-1">
      <p className="text-gray-500">{value}</p>
    </Col>
  </>
);

export default Profile;
