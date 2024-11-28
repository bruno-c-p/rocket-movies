import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
// import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { api } from "../../services/api";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  function handleSelectedTag(tagName) {
    if (tagName === "all") {
      return selectedTags([]);
    }
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?search=${search}&tags=${selectedTags.join(",")}`,
      );
      setNotes(response.data);
    }
    fetchNotes();
  }, [selectedTags, search]);

  return (
    <>
      <Header />
      <ul className="grid-in-menu flex flex-col bg-background900 pt-16 text-center gap-6">
        <li>
          {/* <ButtonText
            title="Todos"
            isActive={selectedTags === 0}
            onClick={() => handleSelectedTag("all")}
          /> */}
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              {/* <ButtonText
                title={tag.name}
                onClick={() => handleSelectedTag(tag.name)}
                isActive={selectedTags.includes(tag.name)}
              ></ButtonText> */}
            </li>
          ))}
      </ul>
      <div className="grid-in-search pt-16 px-16 pb-0">
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid-in-content py-0 px-16 overflow-y-auto">
        <Section title="Minhas Notas">
          {notes &&
            notes.map((note) => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))}
        </Section>
      </div>
      <div className="grid-in-newnote"></div>
      <Link
        to="/new"
        className="grid-in-newnote text-background900 bg-orange border-none flex items-center gap-2 justify-center"
      >
        <FiPlus />
        Criar nota
      </Link>
    </>
  );
}
