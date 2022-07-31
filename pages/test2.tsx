import { Button } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface TestType {
	test: string
}

const Test2 = ({ test }: TestType) => {
	return (
		<>
			<Link href={'/'} passHref>
				<Button>Back</Button>
			</Link>
			<div>{test}</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<TestType> = async (
	context
) => {
	return {
		props: {
			test: 'test',
		},
	}
}

export default Test2
