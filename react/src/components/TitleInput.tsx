export default function TitleInput() {
  return (
    <div className="form-floating mb-3 mt-2">
    <input
      type="text"
      name="title"
      className="form-control"
      id="title"
      placeholder="Title" />
    <label htmlFor="title">Title</label>
  </div>
  )
}
