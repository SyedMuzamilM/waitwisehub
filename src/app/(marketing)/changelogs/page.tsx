import { url } from '@/lib/constants';
import { Metadata } from 'next';
import React from 'react'
import Markdown from 'react-markdown';

const query = `
{
  changelogs {
    _slug
    items {
      _slug
      _title
      version
      releaseDate
      changes {
        markdown
        plainText
      }
    }
  }
}`;

const getChangelogs = async (): Promise<any> => {
  const res = await fetch("https://api.basehub.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer bshb_pk_obl7w4jivfrm3gwzumbtvnvtwegfioc4306ki9o7es99an9s8e1wvegvs1p4sgnh",
    },
    body: JSON.stringify({
      query,
    }),
    cache: 'no-cache'
  });
  return await res.json();
};

type Changelog = {
    _slug: string;
    _title: string;
    version: string;
    releaseDate: string;
    changes: {
        markdown: string;
        plainText: string;
    }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://waitwisehub.blackkalu.com'),
  title: 'Changelogs | WaitWiseHub',
  description: 'waitwisehub changelogs - Check new updates to waitwisehub here',
  twitter: {
    creator: 'Syed Muzamil',
    creatorId: 'syedmuzamilm',
    card: 'summary_large_image'
  },
  openGraph: {
    images: [`${url}/api/og?heading=waitwisehub changelogs&mode=light&type=`]
  }
}

const ChangelogsPage = async () => {
  const data = await getChangelogs()
  const changelogs = data.data.changelogs.items

  return (
    <main className='container'>
        <h1 className='text-4xl font-bold'>Changelogs</h1>
        <div className='my-4 py-4 bordre-t'>
            {changelogs.map((changelog: Changelog) => (
                <div className='border p-2 rounded-lg'>
                    <h2 className='text-2xl font-medium'>{changelog._title}</h2>
                    <div className="flex justify-between">
                        <span className='flex-shrink-0 bg-mantis-300 px-4 border border-mantis-800 text-mantis-800 font-bold rounded-full'>{changelog.version}</span>
                        <span>{changelog.releaseDate}</span>
                    </div>
                    <div className='mt-4'>
                        <Markdown>{changelog.changes.markdown}</Markdown>
                    </div>
                </div>
            ))}
        </div>
    </main>
  )
}

export default ChangelogsPage