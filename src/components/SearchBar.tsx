// SearchBar.jsx
import React, { useState, useEffect, ChangeEvent } from "react";
import APIConsumer from "../api/APIConsumer";
import { Usuario } from "../interfaces/types";
import UserSuggestion from "./UserSuggestion";
import LoadingIcon from "./LoadingIcon";
import "../styles/SearchBar.css";

interface SearchBarProps {
  usuarioId: number;
  onUserSelect: (usuario: Usuario) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ usuarioId, onUserSelect }) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await APIConsumer.buscarUsuarios(search);
        setSuggestions(result.slice(0, 5));
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (usuario: Usuario) => {
    setSearch("");
    setShowDropdown(false);
    onUserSelect(usuario);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="search-bar" onBlur={handleBlur}>
      <div className="input-container">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Buscar usuarios..."
          onFocus={() => setShowDropdown(true)}
          className="search-input"
        />
        {loading && <LoadingIcon />}
      </div>

      {error && <p className="error">{error}</p>}

      {showDropdown && (
        <div className="dropdown-container">
          {suggestions.length > 0 ? (
            <ul className="suggestions-dropdown">
              {suggestions.map(
                (usuario) =>
                  usuario.id !== usuarioId && (
                    <UserSuggestion
                      key={usuario.id}
                      usuario={usuario}
                      onSelect={() => handleSelect(usuario)}
                    />
                  )
              )}
            </ul>
          ) : (
            <p className="no-suggestions">No se encontraron usuarios</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
