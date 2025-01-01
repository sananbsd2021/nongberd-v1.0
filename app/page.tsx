import Hero from "@/components/hero";
// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import MenuListPage from "../components/leftMenulist";
import ImageSlider from "@/components/Imageslider";
import TabsNewsPage from "@/components/tabsnews/page";

export default async function Home() {
  return (
    <>
      {/* <Hero /> */}
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 my-1" /> */}
      <main className="flex-1 flex flex-col gap-6">

        <div className="min-h-screen flex flex-col md:flex-row required:xl">
          <div className="w-full md:w-2/6 p-4">
            <MenuListPage />
          </div>
          <div className="md:w-4/6 p-4">
            <ImageSlider />
            <TabsNewsPage />
          </div>
        </div>
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
    </>
  );
}
