import Image from "next/image";
import { Metadata } from "next";
import { Icon } from "@iconify/react/dist/iconify.js"
import LeadQuoteForm from "@/components/shared/LeadQuoteForm";

export const metadata: Metadata = {
  title: "404 Page | Property ",
};

const ErrorPage = () => {
  return (
    <>
      <section className="flex justify-center pb-0!">
        <Image
          src="/images/404.png"
          alt="404"
          width={490}
          height={450}
          unoptimized={true}
        />
      </section>
      <section className="text-center bg-cover relative overflow-x-hidden" >
        <div className='flex gap-2.5 items-center justify-center'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-dark/75 dark:text-white/75'>
            Error 404
          </p>
        </div>
        <h2 className="text-dark text-52 relative font-bold dark:text-white " >
          Lost? Let Walldot Build Your Way Home.
        </h2>
        <p className="text-lg text-dark/50 dark:text-white/50 font-normal w-full mx-auto">
          Looks like you’ve hit a dead end — but don’t worry, we’ll help you get back on track
        </p>
      </section>
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-md px-4">
          <LeadQuoteForm
            leadSource="website_404"
            title="Can’t find what you’re looking for? Let us help."
            compact
          />
        </div>
      </section>
    </>
  );
};

export default ErrorPage;