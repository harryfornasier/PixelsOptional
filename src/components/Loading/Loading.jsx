import load from "../../assets/icons/load.png";

export default function Loading() {
  return (
    <div align="center" className="loading__container">
      <img src={load} alt="" />
      <p>Loading...</p>
    </div>
  );
}
