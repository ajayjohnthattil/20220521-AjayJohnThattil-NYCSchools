import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import HomeComponent from './components/HomeComponent'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
