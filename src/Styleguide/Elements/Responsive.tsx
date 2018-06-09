import React from "react"

const ResponsiveContext = React.createContext({})

interface Breakpoints {
  [breakpoint: string]: string
}

interface ResponsiveProviderProps {
  breakpoints: Breakpoints
}

interface BreakpointState {
  [breakpoint: string]: boolean
}

interface ResponsiveProviderState {
  breakpoints: BreakpointState
  mediaMatchers: MediaQueryList[]
  mqHandler: null | MediaQueryListListener
}

export class ResponsiveProvider extends React.Component<
  ResponsiveProviderProps,
  ResponsiveProviderState
> {
  constructor(props) {
    super(props)
    this.state = {
      breakpoints: {
        ...Object.keys(props.breakpoints)
          .map(breakpoint => ({
            [breakpoint]: false,
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      },
      mediaMatchers: [],
      mqHandler: null,
    }
  }

  componentDidMount() {
    this.setupObservers(this.props.breakpoints)
  }

  componentWillUnmount() {
    if (this.state.mqHandler) {
      this.state.mediaMatchers.forEach(mediaQuery =>
        mediaQuery.removeListener(this.state.mqHandler)
      )
    }
  }

  setupObservers = breakpoints => {
    const breakpointKeys = Object.keys(breakpoints)
    const mediaMatchers = breakpointKeys.map(breakpoint =>
      window.matchMedia(breakpoints[breakpoint])
    )
    const mqHandler = () => {
      for (let i = 0; i < mediaMatchers.length; ++i) {
        this.setState({
          breakpoints: { [breakpointKeys[i]]: mediaMatchers[i].matches },
        })
      }
    }
    this.setState({ mediaMatchers, mqHandler })
    mediaMatchers.forEach(mediaQuery => {
      mediaQuery.addListener(mqHandler)
    })
    mqHandler()
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state.breakpoints}>
        {this.props.children}
      </ResponsiveContext.Provider>
    )
  }
}

export const Responsive: React.ComponentType<
  React.ConsumerProps<BreakpointState>
> =
  ResponsiveContext.Consumer
