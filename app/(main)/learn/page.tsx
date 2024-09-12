import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticker-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/db/queries";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [
    userProgress
  ] = await Promise.all([
    userProgressData
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Key Signatures", imageSrc: "/piano.jpg"  }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Key Signatures"/>
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;