import List_Group_Item from './List_Group_Item'

export default function List_group() {
  return (
    <aside className="col-3 d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
    <div className="d-flex justify-content-between p-3 border-bottom">
      <span className="fs-5 fw-semibold">Notes</span>
      <a className="btn btn-outline-dark"><i className="bi bi-arrow-bar-left"></i></a>
    </div>
    <div className="list-group list-group-flush border-bottom scrollarea bg-white">
      <List_Group_Item/>
      <List_Group_Item/>
      <List_Group_Item/>
    </div>
  </aside>
  )
}
