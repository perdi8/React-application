import React, { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  onFiltered: () => void;
}

const FilteredButton: React.FC<Props> = (props) => {
  return <button onClick={props.onFiltered}>Find</button>;
};

const useUserCollection = () => {
  const [filter, setFilter] = React.useState("lemoncode");
  const [debouncedFilter] = useDebounce(filter, 200);
  const [userCollection, setUserCollection] = React.useState([]);
  const [userFilterCollection, setUserFilterCollection] = React.useState("");

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${filter}/members`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json))
      .catch(() => {
        alert("Error, debe introducir una empresa existente");
        window.location.reload();
      });
  }, [debouncedFilter]);

  return {
    filter,
    setFilter,
    userCollection,
    setUserFilterCollection,
    userFilterCollection,
  };
};

const MyChildComponent = () => {
  return <h1>Buscador de empresas y sus miembros en GitHub</h1>;
};

export const MyComponent: React.FC = () => {
  const {
    filter,
    setFilter,
    userCollection,
    userFilterCollection,
    setUserFilterCollection,
  } = useUserCollection();

  const filterNameValue = () => {
    setFilter(userFilterCollection);
    //const inputValue = document.getElementById("text").value;
    //setFilter(inputValue);
  };

  return (
    <div>
      <MyChildComponent />
      <input
        placeholder={filter}
        onChange={(e) => setUserFilterCollection(e.target.value)}
      />
      <FilteredButton onFiltered={filterNameValue}></FilteredButton>
      <ul>
        {userCollection.map((member) => (
          <li key={member.id}>{member.login}</li>
        ))}
      </ul>
    </div>
  );
};
