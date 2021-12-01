import { useEffect, useState } from "react";
import { GenreResponseProps, IContentProps } from "../@types";
import { api } from "../services/api";
import { Button } from "./Button";

interface ISideBarProps extends IContentProps {
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
}

export function SideBar({
  setSelectedGenreId,
  selectedGenreId,
}: ISideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
