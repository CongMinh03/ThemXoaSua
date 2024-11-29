
"use client";
export default function SearchForm({onChange}) {
    console.log(process.env.SERVER_API);
    const handleSearch = (e)=>{
        const keyword = e.target.value;
        console.log(keyword);
    };
  return (
    <input type="search" 
    className="form-control mb-3" 
    placeholder="Search" 
    onChange={onChange}
    />
  )
}
