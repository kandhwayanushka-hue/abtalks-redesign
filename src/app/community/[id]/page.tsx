import { notFound } from "next/navigation";
import { communityPost } from "@/data/community";
import PostFeedback from "@/components/community/PostFeedback";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: "repo-as-resume" },
    { id: "launch-numbers" },
    { id: "teaching-day-2" },
    { id: "polish-pass" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = communityPost(id);
  if (!post) return { title: "Community · ABTalks Redesigned" };
  return { title: `${post.title} — Community · ABTalks Redesigned` };
}

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!communityPost(id)) notFound();
  return <PostFeedback id={id} />;
}
