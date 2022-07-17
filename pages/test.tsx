import React from 'react'
import { useMoralisQuery } from 'react-moralis'

const Test = () => {

  const { data, error, isLoading, fetch } = useMoralisQuery(
		'NewGreet',
		(q) =>
			q
				.descending('timestamp_decimal')
				.notEqualTo('uri', '')
				.skip(4)
				.limit(3),
    []
	)
  return (
    <div>{JSON.stringify(data)}</div>
  )
}
export default Test