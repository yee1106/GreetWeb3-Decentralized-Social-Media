import { gql } from '@apollo/client';
import {ethers} from "ethers"


let main = async ()=>{
  let query = gql`
    query ProofQuery($from: String!, $to: String!) {
					connections(fromAddr: $from, toAddrList: [$to], network: ETH) {
						followStatus {
							isFollowed
							isFollowing
						}
					}
				}
  `
  console.log(query.loc?.source.body)
}

main()