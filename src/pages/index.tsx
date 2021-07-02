import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Prismic from '@prismicio/client';

type LinkAccess = {
  title: {
    text: string;
  }[];
  link_para_acesso: {
    url: string;
  }
};

type HomePros = {
  infoBank: {
    banco: string;
    agencia: string;
    conta: string;
    cnpj: string;
    tipo_chave_pix: string;
    chave_pix: string;
    links: LinkAccess[],
  }
}

export default function Home({ infoBank }: HomePros) {
  return (
    <div>
      <Head>
        <title>IBLV | Gerênciador de Links</title>
        <meta name="description" content="Gerênciador de Links" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          IBLV | Uma Igreja em Célula
        </h1>
        <p>Gerênciador de Links</p>
        <span>Banco: {infoBank.banco}</span>
        <span>Ag.: {infoBank.banco}</span>
        <span>Conta: {infoBank.banco}</span>
        <span>cnpj: {infoBank.banco}</span>
        <span>Pix Tipo: {infoBank.banco}: {infoBank.chave_pix}</span>

        { infoBank.links.map(link => (
          <a 
            key={link.link_para_acesso.url} 
            href={link.link_para_acesso.url}
            target="_blank" rel="noreferrer"
            >
              {link.title[0].text}
            </a>
        )) }
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiEndpoint = 'https://manager-link.cdn.prismic.io/api/v2';

  const Client = Prismic.client(apiEndpoint);

  const responsePrismc = await Client.query(
    Prismic.Predicates.at('document.type', 'links_uteis')
  )

  if (responsePrismc && responsePrismc.results[0]) {
    const { data } = responsePrismc.results[0];

    console.log(data.body[0].items);

    return {
      props: {
        infoBank: {
          banco: data.banco[0].text,
          agencia: data.agencia[0].text,
          conta: data.conta[0].text,
          cnpj: data.cnpj[0].text,
          tipo_chave_pix: data.tipo_chave_pix[0].text,
          chave_pix: data.chave_pix[0].text,
          links: data.body[0].items,
        }
      },
    }
  }

  return {
    props: {
      infoBank: {
        banco: "",
        agencia: "",
        conta: "",
        cnpj: "",
        tipo_chave_pix: "",
        chave_pix: "",
        links: [],
      }
    },
  }
}