package CMS;

/**
 * Generated from IDL interface "CustomerInfoService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerInfoServiceHolder	implements org.omg.CORBA.portable.Streamable{
	 public CMS.CustomerInfoService value;
	public CustomerInfoServiceHolder()
	{
	}
	public CustomerInfoServiceHolder (final CMS.CustomerInfoService initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type()
	{
		return CMS.CustomerInfoServiceHelper.type();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = CMS.CustomerInfoServiceHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream _out)
	{
		CMS.CustomerInfoServiceHelper.write (_out,value);
	}
}
