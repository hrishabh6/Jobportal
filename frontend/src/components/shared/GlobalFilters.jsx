import { GlobalSearchAdminFilter } from '@/lib' 
import { formUrlQuery } from '@/lib/utils'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const GlobalFilters = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const typeParams = searchParams.get('type')

  const [active, setActive] = useState(typeParams || '')

  const handleTypeClick = (item) => {
    if (active === item) {
      setActive('')
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: null,
      })
      navigate(newUrl)
    } else {
      setActive(item)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: item.toLowerCase(),
      })
      navigate(newUrl)
    }
  }

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type : </p>
      <div className="flex gap-3">
        {GlobalSearchAdminFilter.map((items) => (
          <button
            type="button"
            key={items.value}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-dark-800  ${
              active === items.value
                ? 'bg-orange-500 text-light-900 hover:bg-orange-600 hover:text-light-900'
                : 'bg-light-700 text-dark-400 hover:text-orange-500 '
            }`}
            onClick={() => handleTypeClick(items.value)}
          >
            {items.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GlobalFilters
