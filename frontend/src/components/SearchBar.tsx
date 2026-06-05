import { useState } from 'react';

interface Props {
  onSearch: (name: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <button type="submit" disabled={loading || !input.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
