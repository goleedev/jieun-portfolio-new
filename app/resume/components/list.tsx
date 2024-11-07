import Link from 'next/link';
import { ReactNode } from 'react';
import { Link as LinkIcon } from 'lucide-react';

// Interfaces
interface IListItem {
  title: ReactNode;
  content: ReactNode;
}

interface IWork {
  company: string;
  position?: string;
  project: string;
  description?: string[];
}

interface IOther {
  project: string;
  position: string;
}

interface IOthers {
  title: string;
  content: IOther[];
}

interface IIndexItem {
  project: string;
  link?: string;
  types: string[];
}

interface IIndexList {
  year: number;
  projects: IIndexItem[];
}

// Sample data
const workData: IWork[] = [
  {
    company: '언컷젬스 컴퍼니',
    position: 'UI/UX Designer / 24.04 ~',
    project: '페이브릴',
    description: [
      '디자인 시스템 구축 및 운영',
      '마케팅 Paid 채널 광고 소재 디자인 (구글/메타/네이버/카카오 등)',
      '마케팅 Owned 채널 콘텐츠 기획 및 디자인',
    ],
  },
  {
    company: '맘편한 세상',
    position: 'Contents Design Intern / 23.03 ~ 23.09',
    project: '맘시터',
    description: [
      '외부 랜딩 페이지 기획 보조 및 디자인',
      '마케팅 Paid 채널 광고 소재 디자인 (구글/메타/네이버/카카오 등)',
      '마케팅 Owned 채널 콘텐츠 디자인',
      '교육 운영에 필요한 디자인 업무 서포트',
    ],
  },
];

const others: IOthers[] = [
  {
    title: 'EXHIBITION',
    content: [
      {
        project: 'Rhode Island College 그래픽 디자인 교류전 참여',
        position: '포스터 디자인 및 전시 / 22.02',
      },
    ],
  },
  {
    title: 'CERTIFICATION',
    content: [
      { project: 'GTQ 일러스트 1급', position: '한국 생산성 본부 / 22.09' },
      {
        project: 'GTQ 그래픽 기술자격 2급',
        position: '한국 생산성 본부 / 19.05',
      },
      { project: '컴퓨터활용능력 1급', position: '대한상공회의소 / 22.04' },
      {
        project: 'MOS PowerPoint 2010 / Excel 2010 Core',
        position: 'Microsoft / 18.12, 18.10',
      },
    ],
  },
];

const indexList: IIndexList[] = [
  {
    year: 24,
    projects: [
      {
        project: 'Project 1',
        link: '/work/test',
        types: ['BRANDING', 'GRAPHIC'],
      },
      { project: 'Project 2', types: ['BRANDING'] },
    ],
  },
  {
    year: 23,
    projects: [
      {
        project: 'Project 3',
        link: '/work/test',
        types: ['BRANDING', 'GRAPHIC'],
      },
      { project: 'Project 4', types: ['BRANDING'] },
    ],
  },
];

// Helper component to display project types
const ProjectTypes = ({ types }: { types: string[] }) => (
  <p className="flex gap-3">
    {types.map((type) => (
      <span
        key={type}
        className="rounded-full bg-white text-sm uppercase px-3.5 py-1.5 font-normal"
      >
        {type}
      </span>
    ))}
  </p>
);

// List item component
function ListItem({ title, content }: IListItem) {
  return (
    <li className="flex flex-col pt-8 pb-[60px] px-0 sm:px-5 sm:pt-10 sm:pb-20 sm:grid sm:grid-cols-2 border-b border-[#CCCCCC] font-medium">
      <div
        style={{
          fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.75rem)',
          lineHeight: 'clamp(2rem, 2.5vw + 1rem, 3.25rem)',
        }}
      >
        {title}
      </div>
      <div>{content}</div>
    </li>
  );
}

// Index list component
function IndexList({ year, projects }: IIndexList) {
  return (
    <div className="flex flex-col border-b border-[#CCC] last:border-none">
      <h3
        style={{
          fontSize: 'clamp(2rem, 4vw + 1rem, 4rem)',
          lineHeight: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
        }}
        className="pt-2"
      >
        {year}&apos;
      </h3>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw + 0.5rem, 1.25rem)',
              lineHeight: 'clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)',
            }}
            className="flex justify-between sm:grid sm:grid-cols-2 py-3 border-b border-[#CCC] last:border-none sm:py-5 font-normal sm:font-medium"
          >
            <div className="text-[#949494] hover:text-black">
              {project.link ? (
                <Link
                  href={project.link}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <span>{project.project}</span>
                  <LinkIcon className="w-4 sm:w-5" />
                </Link>
              ) : (
                <p className="cursor-default">{project.project}</p>
              )}
            </div>
            <ProjectTypes types={project.types} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Main List component
export default function List() {
  return (
    <section className="pt-12 sm:pt-20">
      <ListItem
        title={
          <>
            Hello 👋 <br /> I’m Ji-eun Jang,
            <br /> a UI/UX Designer
          </>
        }
        content={
          <div
            style={{ fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)' }}
            className="flex flex-col gap-4 pt-6 sm:pt-0 sm:gap-5"
          >
            <p>
              As a UI/UX designer, I dive deep into the details of the project,
              but don’t miss the big picture and look at the project from
              different angles. In order to improve the user experience, I work
              closely with both design team and the planning and developer team,
              being responsible for the final result.
            </p>
            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.25vw + 0.5rem, 1.125rem)',
                lineHeight: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.875rem)',
              }}
              className="text-[#949494] font-normal sm:font-medium"
            >
              저는 UI/UX 디자이너로서 프로젝트의 세부 사항을 깊이 파고들면서도
              큰 그림을 놓치지 않고, 다양한 각도에서 프로젝트를 바라보려 합니다.
              유저 경험을 향상시키기 위해 디자인 팀뿐만 아니라 기획 및 개발자
              팀과도 긴밀히 협업하며, 최종 결과물에 대한 책임을 가집니다.
            </p>
          </div>
        }
      />
      {workData.map((work) => (
        <ListItem
          key={work.company}
          title="Work Experience"
          content={
            <div
              className="flex flex-col gap-2 md:gap-2.5"
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw + 0.5rem, 1.25rem)',
                lineHeight: 'clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)',
              }}
            >
              <div className="flex flex-col">
                <h3>{work.company}</h3>
                <p className="text-[#949494] font-normal sm:font-medium">
                  {work.position}
                </p>
              </div>
              <p>{work.project}</p>
              <ul className="list-disc pl-5 sm:pl-7 text-[#949494] font-normal sm:font-medium">
                {work.description?.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          }
        />
      ))}
      {others.map((other) => (
        <ListItem
          key={other.title}
          title="Other Experience"
          content={
            <div
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw + 0.5rem, 1.25rem)',
                lineHeight: 'clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)',
              }}
            >
              <h3>{other.title}</h3>
              {other.content.map((cont, idx) => (
                <div key={idx} className="pl-5 sm:pl-7">
                  <p>{cont.project}</p>
                  <p className="text-[#949494] font-normal sm:font-medium">
                    {cont.position}
                  </p>
                </div>
              ))}
            </div>
          }
        />
      ))}
      <div className="pb-20 sm:pb-[100px]">
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 2.5vw + 1rem, 2.75rem)',
            lineHeight: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
          }}
          className="pt-8 sm:pt-10 pb-6 sm:pb-11 w-full border-b border-[#CCC]"
        >
          Index
        </h2>
        {indexList.map((indexItem) => (
          <IndexList
            key={indexItem.year}
            year={indexItem.year}
            projects={indexItem.projects}
          />
        ))}
      </div>
    </section>
  );
}
