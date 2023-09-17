"use client";
import SearchJobBar from "@/components/SearchJobBar";
import { useAuthContext } from "@/contexts/AuthContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { Degree } from "@/types/Education";
import { Card, Col, Row, Image } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import {
  Fragment,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import { format, formatDuration, intervalToDuration } from "date-fns";
import Link from "next/link";
import { User } from "@/types/User";

const Container = ({ children }: PropsWithChildren) => (
  <div className="w-1/2 pt-5 mx-auto">{children}</div>
);

const Profile = () => {
  const { user, isCompany } = useAuthContext();
  const router = useRouter();
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
  const latestEducation = useMemo(() => getLatestEducation(), [user]);
  const getYearsOfExperience = () => {
    if (
      !user?.userInfo?.experiences ||
      user.userInfo.experiences.length === 0
    ) {
      return undefined;
    }
    let diff = 0;
    for (const experience of user.userInfo.experiences) {
      diff = differenceInMilliseconds(
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
  const yearsOfExperience = useMemo(() => getYearsOfExperience(), [user]);
  if (!user) {
    return <h1>Loading</h1>;
  }
  if (isCompany) {
    router.push("/");
    return;
  }

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
                  Your Profile Score
                </Title>
                <div className="flex justify-center mt-10">
                  <CircularProgressbar
                    className="!w-1/2"
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
                <p className="mt-5 font-thin">
                  Reach profile strength of 80% to be assigned to more jobs.
                </p>
              </Card>
            </Col>
            <Col span={16}>
              <MainInfoCard
                className="mb-5"
                user={user}
                latestEducation={latestEducation}
                yearsOfExperience={yearsOfExperience}
              />
              <Card className="mb-5">
                <Title level={2}>Personal Information</Title>

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
              <Card>
                <Title level={2}>Contact Information</Title>

                <Row gutter={5} className="items-center mt-5">
                  {[
                    {
                      label: "Email address",
                      value: user.email,
                    },
                    {
                      label: "Mobile number",
                      value: user.userInfo?.mobilePhone,
                    },
                  ].map((e) => (
                    <KeyValueColumn {...e} key={e.label} />
                  ))}
                </Row>
              </Card>
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
          className="w-full h-full rounded-full"
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
              value: latestEducation || <Link href="/">this is bad</Link>,
            },
            {
              label: "Experience",
              value: yearsOfExperience || <Link href="/">this is bad</Link>,
            },
          ].map((e) => (
            <KeyValueColumn {...e} key={e.label} />
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
