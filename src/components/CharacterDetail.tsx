import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/rickAndMorty";
import { useParams, useNavigate } from '@tanstack/react-router';
import '../style.css';

export const CharacterDetail = () => {
  const { id } = useParams({ from: "/character/$id" });
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <div>Loading character...</div>;
  if (!data) return <div>Character not found.</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>
      <p>Location: {data.location?.name}</p>
      <button className="backButton" onClick={() => navigate({ to: '/' })}>Back to List</button>
    </div>
  );
};
