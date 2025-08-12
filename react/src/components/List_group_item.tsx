export default function List_Group_Item() {
  return (
    <div
    className="list-group-item list-group-item-action py-3 lh-tight"
    aria-current="true">
    <div className="d-flex w-100 align-items-center justify-content-between">
      <strong className="mb-1">List group item heading</strong>
      <small>Wed</small>
    </div>
    <div className="col-10 mb-1 small">
      Some placeholder content in a paragraph below the heading and date.
    </div>
  </div>
  )
}
