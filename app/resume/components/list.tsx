import Link from 'next/link';
import { ReactNode } from 'react';
import { Link as LinkIcon } from 'lucide-react';

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
      {
        project: 'GTQ 일러스트 1급',
        position: '한국 생산성 본부 / 22.09',
      },
      {
        project: 'GTQ 그래픽 기술자격 2급',
        position: '한국 생산성 본부 / 19.05',
      },
      {
        project: '컴퓨터활용능력 1급',
        position: '대한상공회의소 / 22.04',
      },
      {
        project: 'MOS PowerPoint 2010 / Excel 2010 Core',
        position: 'Microsoft / 18.12, 18.10',
      },
    ],
  },
];

const listData: IListItem[] = [
  {
    title: (
      <>
        Hello 👋 <br /> I’m Ji-eun Jang,
        <br /> a UI/UX Designer
      </>
    ),
    content: (
      <div className="flex flex-col gap-4 pt-6 sm:pt-0 sm:gap-5 sm:text-2xl">
        <p>
          As a UI/UX designer, I dive deep into the details of the project, but
          don’t miss the big picture and look at the project from different
          angles. In order to improve the user experience, I work closely with
          both design team and the planning and developer team, being
          responsible for the final result.
        </p>
        <p className="text-sm leading-5 sm:leading-[30px] sm:text-[20px] text-[#949494] font-normal sm:font-medium">
          저는 UI/UX 디자이너로서 프로젝트의 세부 사항을 깊이 파고들면서도 큰
          그림을 놓치지 않고, 다양한 각도에서 프로젝트를 바라보려 합니다. 유저
          경험을 향상시키기 위해 디자인 팀뿐만 아니라 기획 및 개발자 팀과도
          긴밀히 협업하며, 최종 결과물에 대한 책임을 가집니다.
        </p>
      </div>
    ),
  },
  {
    title: 'Work Experience',
    content: workData.map((work) => {
      return (
        <div
          key={work.company}
          className="flex flex-col gap-2 last:pb-0 pb-5 sm:pb-10 sm:gap-2.5 pt-6 sm:pt-0 text-sm leading-5 sm:leading-[30px] sm:text-[20px] font-medium"
        >
          <div className="flex flex-col">
            <h3>{work.company}</h3>
            <p className="text-[#949494] font-normal sm:font-medium">
              {work.position}
            </p>
          </div>
          <p>{work.project}</p>
          <ul className="list-disc pl-5 sm:pl-7 text-[#949494] font-normal sm:font-medium">
            {work.description &&
              work.description.map((description, index) => (
                <li key={index}>{description}</li>
              ))}
          </ul>
        </div>
      );
    }),
  },
  {
    title: 'Other Experience',
    content: others.map((other) => {
      return (
        <div
          key={other.title}
          className="flex flex-col gap-2 last:pb-0 pb-5 sm:pb-10 sm:gap-2.5 pt-6 sm:pt-0 text-sm leading-5 sm:leading-[30px] sm:text-[20px] font-medium"
        >
          <h3>{other.title}</h3>
          <div className="flex flex-col gap-1 sm:gap-2">
            {other.content.map((content) => (
              <div key={content.project} className="pl-5 sm:pl-7">
                <p className="">{content.project}</p>
                <p className="text-[#949494] font-normal sm:font-medium">
                  {content.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }),
  },
];

interface IIndexItem {
  project: string;
  link?: string;
  types: string[];
}

interface IIndexList {
  year: number;
  projects: IIndexItem[];
}

const indexList: IIndexList[] = [
  {
    year: 24,
    projects: [
      {
        project: 'Project 1',
        link: '/work/test',
        types: ['BRANDING', 'GRAPHIC'],
      },
      {
        project: 'Project 1',
        types: ['BRANDING'],
      },
    ],
  },
  {
    year: 23,
    projects: [
      {
        project: 'Project 1',
        link: '/work/test',
        types: ['BRANDING', 'GRAPHIC'],
      },
      {
        project: 'Project 1',
        types: ['BRANDING'],
      },
    ],
  },
];

function ListItem({ title, content }: IListItem) {
  return (
    <li className="flex flex-col pt-8 pb-[60px] px-0 sm:px-5 sm:pt-10 sm:pb-20 sm:grid sm:grid-cols-2 border-b border-[#CCCCCC] font-medium">
      <div className="text-[28px] leading-[32px] sm:text-[44px] sm:leading-[52px]">
        {title}
      </div>
      <div>{content}</div>
    </li>
  );
}

function IndexList({ year, projects }: IIndexList) {
  return (
    <div className="flex flex-col border-b border-[#CCC] last:border-none">
      <div className="flex flex-col sm:grid sm:grid-cols-2 border-b border-[#CCC] last:border-none">
        <h3 className="text-4xl leading-[60px] sm:text-[64px] sm:leading-[82px] pt-2">
          {year}&apos
        </h3>
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex justify-between sm:grid sm:grid-cols-2 py-3 border-b border-[#CCC] last:border-none sm:py-5 text-sm leading-5 sm:leading-[30px] sm:text-[20px] font-normal sm:font-medium"
            >
              <div className="text-[#949494] hover:text-black">
                {project.link ? (
                  <Link
                    href={project.link}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <span>{project.project}</span>{' '}
                    <LinkIcon className="w-4 sm:w-5" />
                  </Link>
                ) : (
                  <p className="cursor-default">{project.project}</p>
                )}
              </div>
              <p className="flex gap-3">
                {project.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-white text-sm uppercase px-3.5 py-1.5 font-normal"
                  >
                    {type}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function List() {
  return (
    <section className="pt-12 sm:pt-20">
      {listData.map(({ title, content }, index) => (
        <ListItem key={index} title={title} content={content} />
      ))}
      <div className="pb-20 sm:pb-[100px]">
        <h2 className="pt-8 sm:pt-10 text-[28px] pb-6 sm:pb-11 leading-[32px] sm:text-[44px] sm:leading-[52px] w-full border-b border-[#CCC]">
          Index
        </h2>
        {indexList.map(({ year, projects }, index) => (
          <IndexList key={index} year={year} projects={projects} />
        ))}
      </div>
    </section>
  );
}
