import List_group_item from './List_group_item'

export default function List_group() {
  return (
    <aside className="col-3 d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
    <div className="d-flex justify-content-between p-3 border-bottom">
      <span className="fs-5 fw-semibold">Notes</span>
      <a className="btn btn-outline-dark"><i className="bi bi-arrow-bar-left"></i></a>
    </div>
    <div className="list-group list-group-flush border-bottom scrollarea bg-white">
      <List_group_item/>
      <List_group_item/>
      <List_group_item/>
    </div>
  </aside>
  )
}
