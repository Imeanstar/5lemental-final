import { Link } from "react-router-dom"

function SeeAll() {
  return(
    <button className="text-xs font-nanum">
      <Link to='/menulist'>
        전체보기
      </Link>
    </button>
  )
}

export default SeeAll