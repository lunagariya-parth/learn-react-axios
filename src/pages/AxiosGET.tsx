import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageWrapper from "@/components/ui/page-wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Post {
  id: number;
  title: string;
  body: string;
}
type PostInput = Omit<Post, "id">;
export function AxiosGET() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<PostInput>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = postId
          ? `https://jsonplaceholder.typicode.com/posts/${postId}`
          : `https://jsonplaceholder.typicode.com/posts`;

        const response = await axios.get(url);

        if (postId) {
          setPosts([response.data]);
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [postId]);

  const generatePostId = () => {
    // eslint-disable-next-line react-hooks/purity
    return Math.floor(Math.random() * 1000) + 100; // Random ID for demo
  };
  const addPost: SubmitHandler<PostInput> = (data) => {
    const newPost: Post = {
      id: generatePostId(),
      title: data.title,
      body: data.body,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {
        setPosts([response.data]);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    setIsDialogOpen(false);
    return newPost;
  };

  return (
    <PageWrapper title="Axios GET">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between gap-4 flex-wrap">
          <InputGroup className="shrink-0 max-w-80">
            <InputGroupInput
              placeholder="Search Posts by ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="has-[>button]:-mr-3">
              <Button
                className="rounded-s-none"
                onClick={() => {
                  setPostId(searchTerm);
                  setSearchTerm("");
                }}
              >
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={() => setIsDialogOpen((prev) => !prev)}>
            <PlusIcon />
            Add Post
          </Button>
        </div>
        <div className="post-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts found.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id}>
                <Card className="relative py-0 pb-6 overflow-hidden">
                  <div className="absolute inset-0 z-2 h-30 bg-black/35" />
                  <img
                    src={`https://picsum.photos/id/${post.id}/100`}
                    alt="Event cover"
                    className="relative z-2  h-30 w-full object-cover brightness-60 grayscale dark:brightness-40"
                  />
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.body} </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new post. This is just a demo form and won't
                actually submit data.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="gap-4">
              <Field>
                <Label htmlFor="title">Post Title</Label>
                <Input
                  {...register("title", { required: true })}
                  id="title"
                  name="title"
                  defaultValue="Post Title"
                />
              </Field>
              <Field>
                <Label htmlFor="body">Post Body</Label>
                <Input {...register("body")} id="body" name="body" defaultValue="Post Body" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
