function Title({ size, contents }) {
  let fontSize = '';

  switch(size) {
    // 12px
    case 'xs' : fontSize = 'text-xs';
    break;
    // 14px
    case 'sm' : fontSize = 'text-sm';
    break;
    // 16px
    case 'base' : fontSize = 'text-base';
    break;
    // 18px
    case 'lg' : fontSize = 'text-lg';
    break;
    // 20px
    case 'xl' : fontSize = 'text-xl';
    break;
    // 24px
    case '2xl' : fontSize = 'text-2xl';
    break;
    // 30px
    case '3xl' : fontSize = 'text-3xl';
    break;
  }

  return (
		<span className={`font-dohyeon ${fontSize}`}>{contents}</span>
	);
}

export default Title;