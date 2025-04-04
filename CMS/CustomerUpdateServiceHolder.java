package CMS;

/**
 * Generated from IDL interface "CustomerUpdateService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerUpdateServiceHolder	implements org.omg.CORBA.portable.Streamable{
	 public CustomerUpdateService value;
	public CustomerUpdateServiceHolder()
	{
	}
	public CustomerUpdateServiceHolder (final CustomerUpdateService initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type()
	{
		return CustomerUpdateServiceHelper.type();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = CustomerUpdateServiceHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream _out)
	{
		CustomerUpdateServiceHelper.write (_out,value);
	}
}
