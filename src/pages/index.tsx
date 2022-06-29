import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import superjson from 'superjson';
import { useForm } from "react-hook-form";
import {CreateClientInput, createClientInput} from "../shared/create-client-validator";


const Home: NextPage = () => {
  const { data, isLoading, error, refetch} = trpc.useQuery(["clients.getAll"]);

  const { mutate } = trpc.useMutation(["clients.create"], {
    onSuccess() {
      refetch();
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateClientInput>({
  });

  if (error) {
    return <p>{superjson.stringify(error)}</p>;
  }

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Credentials manager</title>
        <meta name="description" content="Credentials manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form onSubmit={handleSubmit((data) => {
          mutate(data);
          reset();
          })}>
        {/* register your input into the hook by invoking the "register" function */}
        <input className="text-slate-800" placeholder="App name" {...register("name")} />
        
        {/* errors will return when field validation fails  */}
        {errors.name && <span>{errors.name.message}</span>}
        
        <input type="submit" value="Crea" />
      </form>
      </div>
      <div>
        {data.map((client) => {
          return <div key={client.id}>{client.id}</div>;
        })}
      </div>
    </>
  );
};

export default Home;
