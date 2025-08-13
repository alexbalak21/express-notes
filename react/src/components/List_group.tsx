import List_group_item from './List_group_item'

export default function List_group() {
  return (
   <>
    <div className="d-flex justify-content-between p-3 border-bottom">
      <span className="fs-5 fw-semibold">Notes</span>
      <a className="btn btn-outline-dark">←</a>
    </div>
    <div className="list-group list-group-flush border-bottom scrollarea bg-white">
      <List_group_item/>
    </div>
  </>
  )
}
