import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Membership from '~/src/app/api/membership/Membership';
import { CustomerMemberShip } from '~/src/app/models/membership_models';

const MembershipLogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userMembership, setUserMembership] = useState<CustomerMemberShip>();

  useEffect(() => {
    getUserRanksLog();
  }, []);

  const getUserRanksLog = async () => {
    setIsLoading(true);
    try {
      const response = await Membership.getUserMembership();
      if (response) {
        setUserMembership(response);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>MembershipLogs</Text>
    </View>
  )
}

export default MembershipLogs

const styles = StyleSheet.create({})