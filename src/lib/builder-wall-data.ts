/**
 * Paste LinkedIn post URLs into the matching event's array. The event IDs and
 * titles below come from the club's Meetup catalog. Leave an array empty until
 * you have links for that event. For posts LinkedIn won't embed, set
 * `previewOnly: true` on an object entry.
 */
export type BuilderWallPostEntry =
  | string
  | { url: string; previewOnly?: boolean };

export type BuilderWallPost = {
  url: string;
  previewOnly: boolean;
};

export function resolveBuilderWallPosts(
  entries: BuilderWallPostEntry[],
): BuilderWallPost[] {
  return entries
    .map((entry) =>
      typeof entry === "string"
        ? { url: entry.trim(), previewOnly: false }
        : { url: entry.url.trim(), previewOnly: Boolean(entry.previewOnly) },
    )
    .filter((entry) => entry.url.length > 0);
}

export const builderWallPostsByEventId: Record<string, BuilderWallPostEntry[]> = {
  // AWS Cloud Club Launch + Kiro IDE Hands-on Workshop
  "313906706": ["https://www.linkedin.com/posts/chinmayee-s-863475335_aws-awscloudclub-kiroide-activity-7446852439892357120-ciqO", "https://www.linkedin.com/posts/deeksha-m-a43351343_aws-awscloudclub-cloudcomputing-ugcPost-7464339149781774336-Dlbl", "https://www.linkedin.com/posts/akshatha-b-71766b379_aws-cloudcomputing-handsonlearning-ugcPost-7446857466308595713-Dajl", "https://www.linkedin.com/posts/c-thanusha-5803703a2_aws-cloudcomputing-handsonlearning-ugcPost-7445691055599144961-a4CQ", "https://www.linkedin.com/posts/tanushri-mahesh-palleda-435b67337_aws-cloudcomputing-webdevelopment-ugcPost-7446595495814418432-ZXH8", ""],

  // Hack Days '26
  "315170389": ["https://www.linkedin.com/posts/jamuna-t-g_hackdays2026-mlh-oscode-ugcPost-7472730603713544193-1ZLc", "https://www.linkedin.com/posts/lakshitha-loganathan_teamathena-hackathon-2ndplace-ugcPost-7472576434730037248-kPLL", "https://www.linkedin.com/posts/varsha-d-18164a28a_hackdays2026-awsstudentbuilders-oscode-ugcPost-7472500455387037696-G2DQ", "https://www.linkedin.com/posts/r-yashwanth0929_atriasummerofcode-asoc-hackdays26-ugcPost-7472314996249583616-C9jx/", "https://www.linkedin.com/posts/satya-satvik-kamisetty-19aa792a9_hackdays2026-mlh-oscode-ugcPost-7473334587507671040-oWEn/", "https://www.linkedin.com/posts/harshini-d-789764357_mlh-hackdays-asoc-ugcPost-7472970303648944130-UdgP/", "https://www.linkedin.com/posts/spotme-mlhhackdays-ai-share-7476199815983505408-dYTu/", "https://www.linkedin.com/posts/allan-nishad_hackdays26-atriainstitute-hackathon-ugcPost-7472661982744072192-XnwT", "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed_hackdays26-atriainstitute-hackathon-ugcPost-7472337164563898369-8aqq", "https://www.linkedin.com/posts/tejash-raju-k-v-b72bb4326_hackdays-atriasummerofcode-awsstudentbuildergroup-ugcPost-7472890351020630016-xbRs/", "https://www.linkedin.com/posts/deekshitha-l-prasad_cybersecurity-techinnovation-hackdays2026-ugcPost-7472703205009747968-2tGZ/", "https://www.linkedin.com/posts/anjalee117_hackdays2026-oscode-oscodeatriachapter-ugcPost-7474121623290257408-HSBQ/", "https://www.linkedin.com/posts/dishas05_mlhhackdays-hackathon-awsstudentbuildergroup-ugcPost-7473762573511778304-WNke/https://www.linkedin.com/posts/ashitha-g-kanchan_hackdays26-hackathon-medialead-ugcPost-7472757250802245632-1Sxp/", "https://www.linkedin.com/posts/mahesh-r-madiwalar-9a468b345_what-started-as-an-unplanned-holiday-with-ugcPost-7473407749276553217-6CVP/", "https://www.linkedin.com/posts/tanushri-mahesh-palleda-435b67337_hackdays2026-mlh-hackathon-ugcPost-7476933558037659648-XDhe/", ""],

  // Spark 2026: Ideate Your First AWS-Powered Product
  "315473389": ["https://www.linkedin.com/posts/bchbenjamin_aws-awsstudentbuilders-spark2026-ugcPost-7481441774079619072-6PAH", "https://www.linkedin.com/posts/adithivr06_had-such-a-great-time-back-thena-great-ugcPost-7501959869453840384-k3Nv/"],

  // How to crack AWS Certifications?
  "316103114": ["https://www.linkedin.com/posts/harshini-d-789764357_aws-awsstudentbuilder-awscommunity-ugcPost-7495530684925800449-DAIF", ""],

  // Spark 2.0
  "316368398": [],

  // Builders' Playground
  "316526434": [],

  // Hacktoberfest 2026
  "316840128": ["https://www.linkedin.com/posts/harshith-k-07070635a_certificate-ugcPost-7520655418470236160-aEYn", "https://www.linkedin.com/posts/lohith-sanju-p_hacktoberfest2026-artificialintelligence-ugcPost-7525555011846660096-0WQj", "https://www.linkedin.com/posts/activity-7522343822501163008-29kj", "https://www.linkedin.com/posts/vinay-bharadwaj-g-r-69959a438_aws-learningbydoing-teamwork-activity-7521281956051841024-HjA2", "https://www.linkedin.com/posts/dhruthi-s-4178a03b2_hacktoberfest-awshackday-opensource-activity-7520034316177948672-l815", "https://www.linkedin.com/posts/g-m-laya-laxmi-97b02742a_hacktoberfest2026-teamwork-awsstudentbuildergroup-activity-7519650745818734592-QTGV", "https://www.linkedin.com/posts/scaffolina-princy-9a760a347_hacktoberfest2026-hackday-awsstudentbuildergroup-activity-7519624766027403264-akrH", "https://www.linkedin.com/posts/scaffolina-princy-9a760a347_hacktoberfest-hackday-awsstudentbuildergroup-activity-7519623229343289344-Yfet", "https://www.linkedin.com/posts/shaurya-sinha-ab477b445_hacktoberfest-hacktoberfest2026-opensource-activity-7518688877470052352-8gx0", "https://www.linkedin.com/posts/ratan-kumar-bv-194135282_hacktoberfest-hacktoberfest2026-opensource-activity-7517856456050659328-xFQf", "https://www.linkedin.com/posts/syedjafar07_hacktoberfest-hacktoberfest2026-opensource-activity-7516865063723433985-Ln90", "https://www.linkedin.com/posts/rakshit-khanna-438373359_hacktoberfest-hacktoberfest2026-opensource-activity-7513637954053951489-_9Cy", "https://www.linkedin.com/posts/sanchita-s-r-33b38b249_hacktoberfest-hacktoberfest2026-opensource-activity-7513294723453825024-f1Ka", "https://www.linkedin.com/posts/dhruthi-s-4178a03b2_hacktoberfest-hacktoberfest2026-opensource-activity-7513599380902465536-6apd", "https://www.linkedin.com/posts/navya-n-a25000416_hacktoberfest-hack-day-bengaluru-x-aws-student-activity-7514605545291456513-eC3q", "https://www.linkedin.com/posts/devanshu-puri-77b68a303_hacktoberfest-hacktoberfest2026-opensource-activity-7513285449340108800-nhIk", "https://www.linkedin.com/posts/sohan-s-naik0_hacktoberfest-hacktoberfest2026-opensource-activity-7513311452225572865-Bhio", "https://www.linkedin.com/posts/daniel-richard-xavier-e-9a6465354_hacktoberfest-hacktoberfest2026-opensource-activity-7513280892501438464-fNFK", "https://www.linkedin.com/posts/bharathganesh21_hacktoberfest-ai-agenticai-ugcPost-7519432645965963264-9E4v", "https://www.linkedin.com/posts/shefali-arora-9a6a2a10_aws-awscommunity-awsstudentcommunity-ugcPost-7522923329939206144-1vWe/", "https://www.linkedin.com/posts/shivam-taneja_hacktoberfest-hackdaybengaluru-opensource-ugcPost-7519882942676951040-4pRS/", "https://www.linkedin.com/posts/ghadage-suraj-ganpat_github-suraj-dot-wqcloudops-incident-assistant-activity-7519441998077128704-Eug3", "https://www.linkedin.com/posts/guru-prasath-c_hacktoberfest2026-opensource-awsstudentbuilder-ugcPost-7523117173326921728-6BjK", "https://www.linkedin.com/posts/jayachandrareddy-majjiga_hacktoberfest2026-awscommunity-hackathon-ugcPost-7520353210981650432-X3v2", "https://www.linkedin.com/posts/joel-arul_hacktoberfest-opensource-awsstudentbuildergroup-ugcPost-7519752237779156992-W1Ok/", "https://www.linkedin.com/posts/adam-aneeq-aqwath_hacktoberfest-hacktoberfest2026-eventhost-ugcPost-7520124634596274176-RJeW/", "https://www.linkedin.com/posts/n-nikhil-21a187328_hacktoberfest-opensource-aws-ugcPost-7519958105552531456-pta6/", "https://www.linkedin.com/posts/joy-princy-s-011775335_hacktoberfest-mlh-opensource-ugcPost-7520059230054150144-JQna/", "https://www.linkedin.com/posts/anshikamishra66666_hacktoberfest-hacktoberfest26-wastewise-ugcPost-7519743622943051776-PPuz", "https://www.linkedin.com/posts/heeda-hurain-siddiqui_hacktoberfest-awsstudentbuildergroup-opensource-ugcPost-7519656136770502656-fIJC", "https://www.linkedin.com/posts/abhishek-bagi-262abhi_hacktoberfest-aws-mlh-ugcPost-7519833452452626432-_v_n", "https://www.linkedin.com/posts/sudhast_aws-awscommunitybuilders-aiengineering-ugcPost-7519814870536568833-8LZy", "https://www.linkedin.com/posts/rohan-chand-m-ab184832a_hacktoberfest-gemma-googleai-ugcPost-7520000548629307392-9TnO", "https://www.linkedin.com/posts/pruthviraj-r-b98123394_hacktoberfest-gemma-generativeai-ugcPost-7520030106891927552-vexs", "https://www.linkedin.com/posts/rishabh-r-nair-64535231b_hacktoberfest-hacktoberfest2026-gemma4-ugcPost-7520189891788451841-eiwp"],
};

export type BuilderWallCustomEvent = {
  /** Lowercase ID used in the URL, e.g. "cloud-study-jam-2026". */
  id: string;
  title: string;
  date: string;
  /** Optional link to an event page, registration page, or recap. */
  eventUrl?: string;
  /** Paste LinkedIn post URLs here. */
  posts: BuilderWallPostEntry[];
};

/** Events that are not listed in the Meetup catalog. */
export const builderWallCustomEvents: BuilderWallCustomEvent[] = [
  {
    id: "future-builders-connect",
    title: "Future Builders' Connect",
    date: "17 October 2026",
    eventUrl: "https://www.futurebuildersconnect.com/gallery#bengaluru", // optional
    posts: ["https://www.linkedin.com/posts/dishas05_awsbuildercenter-futurebuildersconnect-awsstudentbuildergroup-ugcPost-7517944037417324544-pn0w/", "https://www.linkedin.com/posts/harshini-d-789764357_aws-awsbuildercenter-futurebuildersconnect-ugcPost-7517609939352166400-BMyI/", "https://www.linkedin.com/posts/joy-princy-s-011775335_aws-awsbuildercenter-futurebuildersconnect-ugcPost-7518008713606230017-1KxH", "https://www.linkedin.com/posts/blessen-thomas_aws-awsbuildercenter-futurebuildersconnect-ugcPost-7517544075047251968-OEvS", "https://www.linkedin.com/posts/bchbenjamin_awsbuildersconnect-aws-awsbuildercenter-ugcPost-7516866403086356481-v14Q"],
  },
];
