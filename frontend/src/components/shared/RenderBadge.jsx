import { Badge } from "../ui/badge"
import PropTypes from 'prop-types';

const RenderBadge = ({name}) => {
  return (
    <div className="flex justify-between gap-2">
        <Badge className="subtle-medium background-light800_dark400 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
            {name}
        </Badge>
    </div>
  )
}
RenderBadge.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RenderBadge


