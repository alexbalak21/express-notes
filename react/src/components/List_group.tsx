import List_group_item from './List_group_item'
import SearchBar from './SearchBar'

export default function List_group() {
  return (
   <>
    <div className="p-3 border-bottom">
      <SearchBar/>
    </div>
    <div className="list-group list-group-flush border-bottom scrollarea bg-white">
      <List_group_item/>
    </div>
  </>
  )
}
