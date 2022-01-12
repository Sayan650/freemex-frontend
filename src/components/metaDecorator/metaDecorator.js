import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const MetaDecorator = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

MetaDecorator.defaultProps = {
  title: 'Freemex',
  description: 'Freemex - The virtual stock trading game developed by GNU/Linux Users\' Group'
}

export default MetaDecorator
